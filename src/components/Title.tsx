interface Props {
  title: string;
  description: string;
}

export const Title: React.FC<Props> = ({ title, description }) => {
  return (
    <div className="container mx-auto px-4 p-6 text-center">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        <span className="underline underline-offset-3 decoration-8 decoration-blue-400 ">
          {title}
        </span>
      </h1>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        {description}
      </p>
    </div>
  );
};
