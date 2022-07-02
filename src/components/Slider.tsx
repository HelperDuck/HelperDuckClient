import { ChakraProvider, Slider, SliderTrack } from "@chakra-ui/react";
import { SliderFilledTrack, SliderThumb } from "@chakra-ui/slider";
import { useState } from "react";

const SliderRange = () => {
  const [value, setValue] = useState(0);

  return (
    <div className="price-range">
      <ChakraProvider>
        <Slider
          step={5}
          min={0}
          max={100}
          defaultValue={0}
          onChange={(value: number) => setValue(value)}
        >
          <SliderTrack>
            <SliderFilledTrack></SliderFilledTrack>
          </SliderTrack>
          <SliderThumb boxSize={6}></SliderThumb>
        </Slider>
        <p>{value}</p>
      </ChakraProvider>
    </div>
  );
};

export default SliderRange;
