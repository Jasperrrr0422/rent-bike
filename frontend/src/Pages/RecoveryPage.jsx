// import { useForm } from 'react-hook-form';
// const RecoveryPage=()=>{
//     const { register, handleSubmit, watch, formState: { errors } } = useForm();
//     const onSubmit = async (data) => {
//         try {
//             const response = await axios.post('http://127.0.0.1:8000/api/request-password-reset/', data);

//             if (response.status === 200) {
//                 console.log('Code is sent:', response.data);
             

//             }
//         } catch (error) {
//             console.error('Error during registration:', error);
        
//         }
//     };
//     const onSubmit2 = async (data) => {
//         try {
//             const response = await axios.post('http://127.0.0.1:8000/api/reset-password/', data);

//             if (response.status === 200) {
//                 console.log('Password was changed:', response.data);
             

//             }
//         } catch (error) {
//             console.error('Error :', error);
        
//         }
//     };


//     return (
        
//         <div className='container-fluid containerLogoin col-6'>
//             <h2 className='loginHeader text-center'>Reset Password</h2>
     
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <div className="mb-3">
//                     <input 
//                         type="text" 
//                         className="textfield form-control" 
//                         placeholder="Email"
//                         {...register('email', { 
//                             required: 'Email is required',
//                             pattern: {
//                                 value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                                 message: 'Invalid email format'
//                             }
//                         })}
//                     />
//                     {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
//                 </div>

//                 <button type="submit" className="signLoginButton btn btn-dark">Send code to your email</button>
//              </form>
//              <form onSubmit={handleSubmit(onSubmit2)}>
//                 <div className="mb-3">
//                     <input 
//                         type="text" 
//                         className="textfield form-control" 
//                         placeholder="Verification Code"
//                         {...register('verificationCode', { required: 'Verification Code is required' })}
//                     />
//                     {errors.verificationCode && <span style={{ color: 'red' }}>{errors.verificationCode.message}</span>}
//                 </div>
//                 <div className="mb-3">
//                     <input 
//                         type="password" 
//                         className="textfield form-control" 
//                         placeholder="Password"
//                         {...register('newpassword', { 
//                             required: 'Password is required',
//                             minLength: {
//                                 value: 8,
//                                 message: 'Password must be at least 8 characters'
//                             }
//                         })}
//                     />
//                     {errors.newpassword && <span style={{ color: 'red' }}>{errors.newpassword.message}</span>}
//                 </div>
//                 <div className="mb-3">
//                     <input 
//                         type="password" 
//                         className="textfield form-control" 
//                         placeholder="Confirm Password"
//                         {...register('confirmPassword', { 
//                             required: 'Please confirm your password',
//                             validate: (value) => value === watch('password') || 'Passwords do not match'
//                         })}
//                     />
//                     {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword.message}</span>}
//                 </div>
//                 <button type="submit" className="signLoginButton btn btn-dark">Reset password</button>
//             </form>
//         </div>
//     );
// }
// export default RecoveryPage
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const RecoveryPage = () => {
    const emailForm = useForm();
    const resetForm = useForm();
    const [emailSent, setEmailSent] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const onSubmitEmail = async (data) => {
        try {
            setMessage({ text: 'Sending code...', type: 'info' });
            const response = await axios.post('http://127.0.0.1:8000/api/users/request-password-reset/', data);
            
            if (response.status === 200) {
                setEmailSent(true);
                setMessage({ text: 'Verification code has been sent to your email', type: 'success' });
                console.log('Code is sent:', response.data);
            }
        } catch (error) {
            setMessage({ 
                text: error.response?.data?.message || 'Failed to send verification code', 
                type: 'error' 
            });
            console.error('Error during sending code:', error);
        }
    };

    const onSubmitReset = async (data) => {
        try {
            setMessage({ text: 'Resetting password...', type: 'info' });
            const response = await axios.post('http://127.0.0.1:8000/api/users/reset-password/', {
                ...data,
                email: emailForm.getValues('email') // 添加邮箱到重置请求
            });

            if (response.status === 200) {
                setMessage({ text: 'Password has been successfully reset', type: 'success' });
                console.log('Password was changed:', response.data);
            }
        } catch (error) {
            setMessage({ 
                text: error.response?.data?.message || 'Failed to reset password', 
                type: 'error' 
            });
            console.error('Error during password reset:', error);
        }
    };

    return (
        <div className='container-fluid containerLogoin col-6'>
            <h2 className='loginHeader text-center'>Reset Password</h2>
            
            {message.text && (
                <div className={`alert ${message.type === 'error' ? 'alert-danger' : 
                    message.type === 'success' ? 'alert-success' : 'alert-info'}`}>
                    {message.text}
                </div>
            )}
     
            {/* 第一个表单：发送验证码 */}
            <form onSubmit={emailForm.handleSubmit(onSubmitEmail)} className="mb-4">
                <div className="mb-3">
                    <input 
                        type="text" 
                        className="textfield form-control" 
                        placeholder="Email"
                        {...emailForm.register('email', { 
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Invalid email format'
                            }
                        })}
                    />
                    {emailForm.formState.errors.email && 
                        <span style={{ color: 'red' }}>{emailForm.formState.errors.email.message}</span>}
                </div>
                <button 
                    type="submit" 
                    className="signLoginButton btn btn-dark"
                    disabled={emailForm.formState.isSubmitting}
                >
                    {emailForm.formState.isSubmitting ? 'Sending...' : 'Send code to your email'}
                </button>
            </form>

            {/* 第二个表单：重置密码 */}
            {emailSent && (
                <form onSubmit={resetForm.handleSubmit(onSubmitReset)}>
                    <div className="mb-3">
                        <input 
                            type="text" 
                            className="textfield form-control" 
                            placeholder="Verification Code"
                            {...resetForm.register('verificationCode', { 
                                required: 'Verification Code is required' 
                            })}
                        />
                        {resetForm.formState.errors.verificationCode && 
                            <span style={{ color: 'red' }}>{resetForm.formState.errors.verificationCode.message}</span>}
                    </div>
                    <div className="mb-3">
                        <input 
                            type="password" 
                            className="textfield form-control" 
                            placeholder="New Password"
                            {...resetForm.register('newpassword', { 
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters'
                                }
                            })}
                        />
                        {resetForm.formState.errors.newpassword && 
                            <span style={{ color: 'red' }}>{resetForm.formState.errors.newpassword.message}</span>}
                    </div>
                    <div className="mb-3">
                        <input 
                            type="password" 
                            className="textfield form-control" 
                            placeholder="Confirm Password"
                            {...resetForm.register('confirmPassword', { 
                                required: 'Please confirm your password',
                                validate: (value) => value === resetForm.watch('newpassword') || 'Passwords do not match'
                            })}
                        />
                        {resetForm.formState.errors.confirmPassword && 
                            <span style={{ color: 'red' }}>{resetForm.formState.errors.confirmPassword.message}</span>}
                    </div>
                    <button 
                        type="submit" 
                        className="signLoginButton btn btn-dark"
                        disabled={resetForm.formState.isSubmitting}
                    >
                        {resetForm.formState.isSubmitting ? 'Resetting...' : 'Reset password'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default RecoveryPage;