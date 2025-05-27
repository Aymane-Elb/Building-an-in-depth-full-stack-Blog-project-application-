const forgotPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.body;

    // Validate email input
    if (!email) {
        res.status(400);
        return next(new Error('Please provide an email address.'));
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(200).json({
            success: true,
            message: 'If an account with that email exists, a password reset code has been sent to your email.'
        });
    }

    // Generate reset token and 6-digit code
    const resetData = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // CRITICAL DEBUG - Check what we're getting
    console.log('=== RESET DEBUG START ===');
    console.log('resetData full object:', resetData);
    console.log('resetData.code:', resetData.code);
    console.log('resetData.code type:', typeof resetData.code);
    console.log('resetData.token:', resetData.token);
    console.log('resetData.token type:', typeof resetData.token);
    console.log('=== RESET DEBUG END ===');

    // Extract the values properly
    const resetCode = resetData.code;
    const resetToken = resetData.token;

    // Verify they are strings and not undefined
    if (!resetCode || !resetToken) {
        console.error('Reset code or token is undefined!');
        res.status(500);
        return next(new Error('Failed to generate reset codes. Please try again.'));
    }

    // Create reset URL for frontend - this will take user directly to reset page
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Verify resetUrl is properly constructed
    console.log('Reset URL:', resetUrl);

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password for your account.

Your password reset code is: ${resetCode}

Click the link below to reset your password:
${resetUrl}

This code and link are valid for 10 minutes. If you did not request this, please ignore this email.`;

    const htmlMessage = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
            <p>You are receiving this email because you (or someone else) has requested a password reset for your account.</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
                <h3 style="color: #007bff; margin: 0;">Your Reset Code:</h3>
                <h1 style="color: #333; letter-spacing: 2px; margin: 10px 0; font-size: 32px; font-weight: bold;">${resetCode}</h1>
                <p style="color: #666; margin: 0;">This code will expire in 10 minutes.</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}"
                   style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                    Reset My Password
                </a>
            </div>
            
            <p style="font-size: 14px; color: #666;">
                If the button doesn't work, copy and paste this link into your browser:<br>
                <a href="${resetUrl}" style="color: #007bff; word-break: break-all;">${resetUrl}</a>
            </p>
            
            <p style="font-size: 14px; color: #666;">
                If you did not request this, please ignore this email and your password will remain unchanged.
            </p>
        </div>
    `;

    try {
        // Log what we're sending
        console.log('About to send email with message:', message);
        console.log('Email HTML contains code:', htmlMessage.includes(resetCode));

        await sendEmail({
            email: user.email,
            subject: 'Password Reset Request for Urban Signalez',
            message,
            html: htmlMessage
        });

        res.status(200).json({
            success: true,
            message: 'If an account with that email exists, a password reset code has been sent to your email.'
            // Don't send resetToken in response for security - user should click email link
        });

        console.log(`Password reset email sent to: ${user.email}`);
        console.log(`Reset code sent: ${resetCode}`);

    } catch (err) {
        console.error('Email sending error:', err);
        
        // Clear the reset fields if email fails
        user.passwordResetToken = undefined;
        user.passwordResetCode = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        res.status(500);
        return next(new Error('There was a problem sending the email. Please try again later.'));
    }
});