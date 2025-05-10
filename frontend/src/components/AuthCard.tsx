
type AuthProps = {
  info: {
    fields: string[];
    placeholder: string[];
    title: string;
    subtitle: string;
    buttonText: string;
    actionButtonText: string;
    submitOperation: (e: any) => void;
    toggleMode?: () => void;
    tagline: string;
  };
};

function AuthCard(props: AuthProps) {
  const {
    fields,
    placeholder,
    title,
    subtitle,
    buttonText,
    actionButtonText,
    submitOperation,
    toggleMode,
    tagline
  } = props.info;
  return (
    <main className="flex flex-col md:flex-row h-auto">
  <section className="bg-white w-full md:w-1/2  h-screen">
    <div className="flex flex-col items-center justify-center h-full p-6">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600 mb-8 text-center">
        {subtitle}{" "}
        <button
          onClick={toggleMode}
          className="underline underline-offset-2 cursor-pointer"
        >
          {buttonText}
        </button>
      </p>
      <form
        className="flex flex-col w-full sm:w-2/3 md:w-1/2"
        onSubmit={submitOperation}
      >
        {fields.map((field, index) => (
          <label
            key={index}
            className="flex flex-col text-zinc-700 font-semibold mb-2"
            htmlFor={field}
          >
            {field}
            <input
              id={field}
              type={field}
              placeholder={placeholder[index]}
              className="border font-normal text-sm text-zinc-500 mt-1 border-gray-300 p-2 mb-4 rounded"
            />
          </label>
        ))}
        <button
          type="submit"
          className="bg-black text-white p-2 rounded hover:opacity-60 transition duration-200"
        >
          {actionButtonText}
        </button>
      </form>
    </div>
  </section>
  <section className="w-full hidden md:w-1/2 h-auto md:h-screen bg-zinc-300 md:flex items-center justify-center p-6 xl:px-20">
    <h1 className="text-2xl text-justify font-bold">{tagline}</h1>
  </section>
</main>

  );
}

export default AuthCard;
