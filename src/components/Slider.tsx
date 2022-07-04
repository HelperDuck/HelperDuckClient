import { ChakraProvider, Slider, SliderTrack } from "@chakra-ui/react";
import { SliderFilledTrack, SliderThumb } from "@chakra-ui/slider";

const SliderRange = ({ value, setValue }: any) => {
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
          <SliderThumb boxSize={6}>
            {/* <Box color="300.blue" as={Duck} /> */}
          </SliderThumb>
        </Slider>
        <p>{value}</p>
      </ChakraProvider>
    </div>
  );
};

export default SliderRange;
