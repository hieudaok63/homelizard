import { useEffect, useState } from "react";

import Layout from "~/components/layouts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { personalDataMocks } from "~/mocks";
import { useToggleStore } from "~/zustand/store";
import {
  AddressForm,
  BasisInfoForm,
  CurriculumVitaeForm,
  EmailWebForm,
  PhoneForm,
  PlaceOfWorkForm,
  ProfileTab,
} from "./components";

export default function PersonalData() {
  const [selectTab, setSelectTab] = useState<string>("");

  const toggleModal = useToggleStore((state) => state.toggleModal);
  const setToggleModal = useToggleStore((state) => state.setToggleModal);

  const showModal = (val: any) => {
    setSelectTab(val?.title);
    setToggleModal(true);
  };

  const renderForm = () => {
    switch (selectTab) {
      case "Basisdaten":
        return (
          <>
            <BasisInfoForm />
          </>
        );
      case "Mobile phone":
        return (
          <>
            <PhoneForm />
          </>
        );
      case "Email & web":
        return (
          <>
            <EmailWebForm />
          </>
        );
      case "Adressen":
        return (
          <>
            <AddressForm />
          </>
        );

      case "Curriculum vitae":
        return <CurriculumVitaeForm />;

      case "Arbeitsplatz":
        return (
          <>
            <PlaceOfWorkForm />
          </>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    return () => {
      setToggleModal(false);
    };
  }, [setToggleModal]);

  return (
    <Layout>
      <div className="h-full w-full bg-yellow-200 pt-24">
        <div className="p-4">
          {!toggleModal && (
            <div className="w-full">
              {personalDataMocks?.map((data) => {
                return (
                  <Accordion type="single" collapsible key={data.id}>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        <ProfileTab data={data} />
                      </AccordionTrigger>
                      <AccordionContent>
                        <div>
                          {data.subPersonData.map((val, index) => (
                            <ProfileTab
                              key={index}
                              data={val}
                              onArrow={() => showModal(val)}
                            />
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              })}
            </div>
          )}
          {toggleModal && <div>{renderForm()}</div>}
        </div>
      </div>
    </Layout>
  );
}
