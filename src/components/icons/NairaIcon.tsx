interface NairaIconProps {
  className?: string;
}

export function NairaIcon({ className = "h-5 w-5" }: NairaIconProps) {
  return (
    <span className={`${className} inline-flex items-center justify-center font-bold`}>
      ₦
    </span>
  );
}
