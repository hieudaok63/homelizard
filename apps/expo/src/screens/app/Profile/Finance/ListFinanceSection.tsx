import React, { useState, type PropsWithChildren } from "react";
import { Dimensions, FlatList, ScrollView, View } from "react-native";
import { useTranslation } from "react-i18next";

import CartIcon from "@assets/icons/CartIcon.svg";

import { BottomNavBarPadding } from "~/components/navigation/NavBar";
import { AppBanner } from "~/components/ui";
import { CreditInformationSection } from "./CreditInformationSection";
import { CreditStatusSection } from "./CreditStatusSection";
import { LayoutFinance } from "./_layoutFinance";

export const LayoutListBanner = ({ children }: PropsWithChildren) => {
  const { width } = Dimensions.get("window");
  return (
    <View
      className="mb-3 items-center justify-center"
      style={{
        width: width,
      }}
    >
      {children}
    </View>
  );
};

export const RenderBanner = () => {
  return (
    <>
      <LayoutListBanner>
        <AppBanner
          title="Brauchst du Hilfe?"
          description="Hier verstecken sich oft Fragen deren Antwort man nicht kennt. Wende dich daher einfach unsere Spezialisten und Vermittler von finanzwerk"
          titleBtn="Zum Spezialisten"
          onPress={() => alert(1)}
          onCloseBanner={() => alert(2)}
          IconLeftProps={<CartIcon />}
          variant="blue"
        />
      </LayoutListBanner>
      <LayoutListBanner>
        <AppBanner
          title="Zusage vorhanden?"
          description="Lade einfach hier digitale Nachweise um den Prozess zu beschleunigen"
          titleBtn="Hier hochladen"
          onPress={() => alert(1)}
          onCloseBanner={() => alert(2)}
          IconLeftProps
          variant="pink"
        />
      </LayoutListBanner>
    </>
  );
};

export const ListFinanceSection = () => {
  const { t } = useTranslation();

  const [showOptionCreditStatus, setShowOptionCreditStatus] = useState(false);
  const [showOptionCreditInformation, setShowOptionCreditInformation] =
    useState(false);
  const [showFinancialInformation, setShowFinancialInformation] =
    useState(false);

  return (
    <LayoutFinance>
      <ScrollView className="h-full pt-5" showsVerticalScrollIndicator={false}>
        <FlatList
          data={[1]}
          renderItem={RenderBanner}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onEndReachedThreshold={1}
          initialNumToRender={1}
          pagingEnabled
          horizontal
          className="pb-5"
        />
        <View className="rounded-[45px] px-8  ">
          <CreditStatusSection
            isShowModal={showOptionCreditStatus}
            setShowListOption={setShowOptionCreditStatus}
            title="Zusagen"
          />
          <CreditInformationSection
            isShowModal={showOptionCreditInformation}
            setShowListOption={setShowOptionCreditInformation}
            title="Bonität"
          />
          <CreditInformationSection
            isShowModal={showFinancialInformation}
            setShowListOption={setShowFinancialInformation}
            title="Finanzierung"
          />
        </View>
        <BottomNavBarPadding />
      </ScrollView>
    </LayoutFinance>
  );
};
