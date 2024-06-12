import { DetailedHTMLProps, FormHTMLAttributes, ReactNode } from "react";

interface Props {
  children: ReactNode | ReactNode[];
}

const Form = (
  props: Props &
    DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
) => {
  return (
    <form style={{ ...props.style, width: "100%" }} {...props}>
      {props.children}
    </form>
  );
};

export default Form;
