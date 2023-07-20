import { ArrowBack } from "~/components";
import { PATH_IMAGE } from "~/constants/navigation";
import LayoutSearch from "~/pages/search-wizard/_layout";

export default function ChooseImage() {
  return (
    <LayoutSearch>
      <ArrowBack
        text="Wir finden für dich"
        content="Welchen Stil soll das Objekt haben? "
        subContent="Wähle aus der Liste"
        path={PATH_IMAGE}
      />

      <div></div>
    </LayoutSearch>
  );
}
