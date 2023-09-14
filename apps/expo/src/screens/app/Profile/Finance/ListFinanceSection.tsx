import React, { type PropsWithChildren } from "react";
import { Dimensions, FlatList, ScrollView, View } from "react-native";
import { t } from "i18next";

import CartIcon from "@assets/icons/CartIcon.svg";

import { BottomNavBarPadding } from "~/components/navigation/NavBar";
import { AppBanner } from "~/components/ui";
import { CreditInformationSection } from "./CreditInformationSection";
import { CreditStatusSection } from "./CreditStatusSection";
import { FinancialInformationSection } from "./FinancialInformationSection";
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
          title={t("profile:finance.banner.title")}
          description={t("profile:finance.banner.description")}
          titleBtn={t("profile:finance.banner.textBtn")}
          onPress={() => alert(1)}
          onCloseBanner={() => alert(2)}
          IconLeftProps={<CartIcon />}
          variant="blue"
        />
      </LayoutListBanner>
      <LayoutListBanner>
        <AppBanner
          title={t("profile:finance.banner2.title")}
          description={t("profile:finance.banner2.description")}
          titleBtn={t("profile:finance.banner2.textBtn")}
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
        <View className="space-y-2 px-8">
          <CreditStatusSection />
          <CreditInformationSection />
          <FinancialInformationSection />
        </View>
        <BottomNavBarPadding />
      </ScrollView>
    </LayoutFinance>
  );
};
