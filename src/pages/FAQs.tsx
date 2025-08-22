import FAQsItems from "@/components/modules/FAQpage/FAQsItems";
import { Link } from "react-router";

const FAQs = () => {


  return (
    <>
      <div className="flex flex-col md:flex-row mx-auto px-4 sm:px-6 lg:px-8 py-16 gap-4">
        <div className="w-full md:w-1/5 min-w-xs">
          <Link
            to="/contact"
            className="block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6"
          >
            <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
              <div className="mt-4 sm:mt-0">
                <h3 className="text-lg font-medium text-pretty text-gray-900">
                  Can't find your answer?
                </h3>
                <h3 className="text-lg font-medium text-pretty text-gray-900">
                  We're here to help.
                </h3>

                <div className="pt-4">
                  <p className="mt-1 text-[16px] text-gray-700">
                  info@walletmanagement.com
                </p>
                <p className="mt-1 text-[16px] text-gray-700">
                  +880 1619028278
                </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="grow-1">

          <FAQsItems />
          
        </div>
      </div>
    </>
  );
};

export default FAQs;
