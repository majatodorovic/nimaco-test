import { format } from 'date-fns';

const Credits = () => {
  const currentYear = format(new Date(), 'yyyy');

  return (
    <div className="flex items-center bg-croonus-2">
      <div className="flex w-full items-center justify-center py-3 text-center text-sm text-croonus-1 md:mx-auto md:w-[90%] md:justify-start">
        <span className="text-center">
        &copy; {currentYear} Nimaco | Sva prava zadržana. Powered by{" "}
          <a href="https://www.croonus.com/" className="text-croonus-3 ">
            Croonus Technologies.
          </a>
        </span>
      </div>
    </div>
  );
};

export default Credits;
