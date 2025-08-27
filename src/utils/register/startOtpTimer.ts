/* eslint-disable @typescript-eslint/no-explicit-any */
  // OTP Timer functionality
  export const startOtpTimer = ({setOtpTimer, setCanResendOtp}: any) => {
    setOtpTimer(60);
    setCanResendOtp(false);
    const timer = setInterval(() => {
      setOtpTimer((prev: any) => {
        if (prev <= 1) {
          setCanResendOtp(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };