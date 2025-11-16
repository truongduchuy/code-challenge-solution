import React, { memo } from 'react';

interface SubmitButtonProps {
  isSubmitting: boolean;
  disabled: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = memo(({
  isSubmitting,
  disabled,
}) => {
  return (
    <button
      type="submit"
      className={`h-[50px] rounded-[12px] ${disabled ? "cursor-not-allowed" : ""}`}
      disabled={disabled}
    >
      {isSubmitting ? (
        <>
          <span className="spinner"></span>
          Processing...
        </>
      ) : (
        "Swap"
      )}
    </button>
  );
});

SubmitButton.displayName = 'SubmitButton';