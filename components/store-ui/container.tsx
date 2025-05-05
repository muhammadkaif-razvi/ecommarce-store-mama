interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="mx-auto max-w-7xl lg:mt-16 pt-12">{children}</div>;
};

export default Container;
