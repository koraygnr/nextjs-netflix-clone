import { cva, VariantProps } from "class-variance-authority"

const buttonStyles = cva(
   "flex items-center justify-center gap-x-2 rounded transition hover:opacity-75",
   {
      variants: {
         variant: {
            filled: "bg-white text-black",
            outlined: "text-white border-solid border-2 border-white",
         },
         fullWidth: {
            true: "w-full",
         },
         size: {
            sm: "text-sm font-semibold px-5 py-1.5",
            md: "text-xl font-semibold px-8 py-2.5",
         },
      },
      defaultVariants: {
         variant: "filled",
         size: "md",
      },
   },
);

type ButtonBaseProps = VariantProps<typeof buttonStyles>
interface Props
   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
      ButtonBaseProps {}


function Button({ children, variant, size, fullWidth, className, ...props }:Props) {
   return (
      <button
         className={buttonStyles({ variant, size, fullWidth, className })}
         {...props}
      >
         {children}
      </button>
   )
}

export default Button
