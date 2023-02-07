import { cva, VariantProps } from 'class-variance-authority';

const buttonStyles = cva(
  'flex items-center justify-center gap-x-2 rounded transition',
  {
    variants: {
      variant: {
        filled: 'hover:opacity-75',
        outlined:
          'text-white border-solid border-2 border-white hover:opacity-75',
        icon: 'bg-black/60 text-white rounded-full hover:border-white hover:bg-white/10',
      },
      fullWidth: {
        true: 'w-full',
      },
      size: {
        sm: 'text-sm font-semibold px-5 py-1.5',
        md: 'text-xl font-semibold px-8 py-2.5',
        icon: 'text-xl p-2',
      },
      colors: {
        white: 'bg-white text-black',
        red: 'bg-[#d81f26] text-white',
      },
    },
    defaultVariants: {
      variant: 'filled',
      size: 'md',
      colors: 'white',
    },
  }
);

type ButtonBaseProps = VariantProps<typeof buttonStyles>;
interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonBaseProps {}

function Button({
  children,
  variant,
  size,
  fullWidth,
  colors,
  className,
  ...props
}: Props) {
  return (
    <button
      className={buttonStyles({ variant, size, fullWidth, colors, className })}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
