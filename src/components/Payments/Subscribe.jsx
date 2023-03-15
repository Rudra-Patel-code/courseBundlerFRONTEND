import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../redux/store";
import { buySubscription } from "../../redux/actions/userAction";
import toast from "react-hot-toast";

const Subscribe = ({ user }) => {
  const [key, setKey] = useState("");
  const dispatch = useDispatch();
  const { loading, error, subscriptionId } = useSelector(
    (state) => state.subscription
  );

  const { error: courseError } = useSelector((state) => state.course);

  const subscribeHandler = async () => {
    const { data } = await axios.get(`${server}/razorpaykey`);

    setKey(data.key);
    dispatch(buySubscription());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (courseError) {
      toast.error(courseError);
      dispatch({ type: "clearError" });
    }
    if (subscriptionId) {
      const openPopup = () => {
        const options = {
          key,
          name: "Course Bundler",
          description:
            "This is Demo Site Do Not Enter Real Info Other Than Phone No. As You Will Not Get Any Courses As All Courses Are For Dema Purpose And Are Fake, Instead Enter Given Details ",
          subscription_id: subscriptionId,
          callback_url: `${server}/paymentverification`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: "",
          },
          notes: {
            address: " --- ",
          },
          theme: {
            color: "#FFC800",
          },
        };

        const razor = window.Razorpay(options);

        razor.open();
      };
      openPopup();
    }
  }, [
    dispatch,
    courseError,
    error,
    user.name,
    user.email,
    key,
    subscriptionId,
  ]);

  return (
    <Container h="90vh" p="16">
      <Heading children="Welcome" my="8" textAlign={"center"} />

      <VStack
        boxShadow={"lg"}
        alignItems="stretch"
        borderRadius={"lg"}
        spacing="0"
      >
        <Box bg="yellow.400" p={"4"} css={{ borderRadius: "8px 8px 0 0" }}>
          <Text color={"black"} children={`Pro Pack - ₹299.00`} />
        </Box>
        <Box p="4">
          <VStack textAlign={"center"} px="8" mt={"4"} spacing="8">
            <Text children={`Join pro pack and get access to all content.`} />
            <Heading size="md" children={"₹299 Only"} />
          </VStack>

          <Button
            my="8"
            w="full"
            colorScheme={"yellow"}
            onClick={subscribeHandler}
            isLoading={loading}
          >
            Buy Now
          </Button>
        </Box>

        <Box bg="blackAlpha.600" p="4" css={{ borderRadius: "0 0 8px 8px" }}>
          <Heading
            color={"white"}
            textTransform="uppercase"
            size="sm"
            children={"100% refund at cancellation"}
          />

          <Text
            fontSize={"xs"}
            color="white"
            children={"*Terms & Conditions Apply"}
          />
        </Box>
      </VStack>
    </Container>
  );
};

export default Subscribe;
