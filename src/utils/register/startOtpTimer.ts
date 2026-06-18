type Setter<T> = (value: T | ((prev: T) => T)) => void;

interface OtpTimerParams {
  setOtpTimer: Setter<number>;
  setCanResendOtp: Setter<boolean>;
}

export const startOtpTimer = ({ setOtpTimer, setCanResendOtp }: OtpTimerParams) => {
  setOtpTimer(60);
  setCanResendOtp(false);
  const timer = setInterval(() => {
    setOtpTimer((prev: number) => {
      if (prev <= 1) {
        setCanResendOtp(true);
        clearInterval(timer);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
};
