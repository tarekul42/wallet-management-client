import FAQcard from "@/pages/FAQ/FAQcard";
import FAQNeedHelp from "@/pages/FAQ/FAQNeedHelp";
import FAQsItems from "@/pages/FAQ/FAQsItems";
import FAQTitle from "@/pages/FAQ/FAQTitle";

const FAQs = () => {
  return (
    <>
    <div>
      <FAQTitle />
      <FAQNeedHelp />
      <div className="flex flex-col md:flex-row mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-16 gap-4">
        <div className="w-full md:w-1/5 min-w-xs">
          <FAQcard />
        </div>
        <div className="grow-1">
          <FAQsItems />
        </div>
      </div>
      </div>
    </>
  );
};

export default FAQs;
