import Image from "next/image";
import Link from "next/link";

import { HeartRed, LogoHomelizard } from "~/assets";
import {
  email,
  facebook,
  instagram,
  location,
  panRight,
  phone,
  skype,
  whatsapp,
} from "~/assets/iconsMarketting";
import homelizard from "~/assets/images/homelizard.gif";

type INavigationItem = {
  id: number | string;
  text: string;
  href: string;
};

const Aboutmenu: INavigationItem[] = [
  {
    id: 1,
    text: "How It Works",
    href: "/",
  },
  {
    id: 2,
    text: "Customers",
    href: "/",
  },
  {
    id: 3,
    text: "Our Story",
    href: "/",
  },
  {
    id: 4,
    text: "Carrer",
    href: "/",
  },
  {
    id: 5,
    text: "Contact Us",
    href: "/",
  },
  {
    id: 6,
    text: "FAQs",
    href: "/",
  },
];
const SupportAndSummaryList: INavigationItem[] = [
  {
    id: 1,
    text: "Helping Center",
    href: "/",
  },
  {
    id: 2,
    text: "Terms and Conditions",
    href: "/",
  },
  {
    id: 3,
    text: "Our Story",
    href: "/",
  },
  {
    id: 4,
    text: "Buy or Rent",
    href: "/",
  },
  {
    id: 5,
    text: "Properties",
    href: "/",
  },
  {
    id: 6,
    text: "Blogs",
    href: "/",
  },
];

const NavigationItem = ({ item }: { item: INavigationItem }) => {
  return (
    <li
      key={item.id}
      className=" group flex cursor-pointer items-center py-2 text-base font-normal text-grey_4 duration-300 hover:text-blue_6"
    >
      <Image
        src={panRight}
        alt="panRight"
        className="hidden animate-fadeIn duration-300 group-hover:block"
      />
      <Link href={item.href}>{item.text}</Link>
    </li>
  );
};

export default function Footer() {
  return (
    <footer className="bg-white px-3 sm:px-6 lg:px-24 3xl:px-[18.75rem]">
      <div className="flex flex-wrap justify-between pb-10">
        <div className="md:w-1/2 2xl:w-[34%]">
          <Image src={LogoHomelizard} alt="" className="mb-3" />
          <p className="mb-5 w-[350px] text-sm font-normal leading-5 text-grey_4">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur a odit aut
            fugit sed consequuntur magni dolores eos qui ratione.
          </p>
          <div className="flex">
            <div>
              <p className=" mb-3 font-semibold">Follow Us</p>
              <div className="flex items-center justify-between">
                <Image src={facebook} alt="" className=" cursor-pointer" />
                <Image
                  src={instagram}
                  alt=""
                  className=" mx-3 cursor-pointer"
                />
                <Image src={skype} alt="" className=" cursor-pointer" />
                <Image src={whatsapp} alt="" className=" mx-3 cursor-pointer" />
              </div>
            </div>
            <Image src={homelizard} width={300} height={300} alt="" />
          </div>
        </div>
        <div className="md:w-1/2 2xl:w-[22%]">
          <p className="mb-2 text-xl font-semibold text-[#2A323C]">About Us</p>
          <ul>
            {Aboutmenu.map((item) => {
              return <NavigationItem item={item} key={item.id} />;
            })}
          </ul>
        </div>
        <div className="md:w-1/2 2xl:w-[22%]">
          <p className="mb-2 text-xl font-semibold text-[#2A323C]">
            Support & Summary
          </p>
          <ul>
            {SupportAndSummaryList.map((item) => {
              return <NavigationItem item={item} key={item.id} />;
            })}
          </ul>
        </div>
        <div className="md:w-1/2 2xl:w-[22%]">
          <p className="mb-2 text-xl font-semibold text-[#2A323C]">
            Contact Us
          </p>
          <div className="mb-4 flex items-center">
            <Image src={email} alt="" className="mr-3 h-9 w-9" />
            <div>
              <p className="text-base font-normal text-[#2A323C]">E-mail</p>
              <p className="text-sm font-normal text-grey_4">
                youremailid@gmail.com
              </p>
            </div>
          </div>
          <div className="mb-4 flex items-center">
            <Image src={phone} alt="" className="mr-3 h-9 w-9" />
            <div>
              <p className="text-base font-normal text-[#2A323C]">Contact</p>
              <p className="text-sm font-normal text-grey_4">
                (+01) 123 456 7890
              </p>
            </div>
          </div>
          <div className="mb-4 flex items-center">
            <Image src={location} alt="" className="mr-3 h-9 w-9" />
            <div>
              <p className="text-base font-normal text-[#2A323C]">Location</p>
              <p className="w-[200px] text-sm font-normal text-grey_4">
                3012 Pine Garden Lane Atlanta, Boulevard, GA 30328
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="item-center border-gray flex justify-between border-t-[1px] py-5">
        <div className="item-center flex">
          <span className="text-sm font-semibold text-grey_4">
            Copyright © 2022 Prodactive GmbH. Crafted with
          </span>
          <Image src={HeartRed} alt="" className="w-5" />
        </div>
        <span className="text-sm font-normal tracking-wide text-grey_4">
          Imprint
        </span>
      </div>
    </footer>
  );
}
