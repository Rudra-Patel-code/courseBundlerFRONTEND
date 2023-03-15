import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/actions/profileActions";
import { toast } from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { loading, message, error } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const params = useParams();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(params.token, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      navigate("/login");
    }
  }, [dispatch, error, message]);

  return (
    <Container py={"16"} h="90vh">
      <form onSubmit={submitHandler}>
        <Heading
          children="Reset Password"
          my="16"
          textTransform={"uppercase"}
          textAlign={["center", "left"]}
        />

        <VStack spacing={"8"}>
          <Input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            type={"password"}
            focusBorderColor="yellow.500"
          />

          <Button
            isLoading={loading}
            type="submit"
            w={"full"}
            colorScheme="yellow"
          >
            Reset Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ResetPassword;
