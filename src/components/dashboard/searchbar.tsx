import React from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import Image from "next/image";

const SearchBar = () => {
  return (
    <div className="grow">
      <InputGroup className="border-primary h-10">
        <InputGroupInput placeholder="Search by exam title" />
        <InputGroupAddon align={"inline-end"}>
          <Image
            src={"/assets/search_icon.svg"}
            alt=""
            width={32}
            height={32}
          />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default SearchBar;
