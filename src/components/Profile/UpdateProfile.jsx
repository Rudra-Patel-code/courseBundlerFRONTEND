import React, { useState, useEffect } from "react";
import { Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/actions/profileActions";
import { loadUser } from "../../redux/actions/userAction";
import { toast } from "react-hot-toast";

const UpdateProfile = ({ user }) => {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");

  const { loading, message, error } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    await dispatch(updateProfile(name, email));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);

  return (
    <Container py="16" minH={"90vh"}>
      <form onSubmit={submitHandler}>
        <Heading
          textTransform={"uppercase"}
          children="Update Profile"
          my="16"
          textAlign={["center", "left"]}
        />

        <VStack spacing={"8"}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            type={"text"}
            focusBorderColor="yellow.500"
            isRequired
          />{" "}
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type={"email"}
            focusBorderColor="yellow.500"
            isRequired
          />
          <Button
            isLoading={loading}
            w="full"
            colorScheme={"yellow"}
            type="submit"
          >
            Update
          </Button>
          <Button
            variant={"outline"}
            isLoading={loading}
            w="full"
            colorScheme={"yellow"}
            type="submit"
            onClick={() => navigate("/profile")}
          >
            Go To Profile
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default UpdateProfile;
