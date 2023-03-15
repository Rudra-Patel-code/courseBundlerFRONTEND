import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../redux/actions/courseActions";
import { addToPlaylist } from "../../redux/actions/profileActions";
import toast from "react-hot-toast";
import { loadUser } from "../../redux/actions/userAction";

const Course = ({
  views,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
  loading,
}) => {
  return (
    <VStack className="course" alignItems={["center", "flex-start"]}>
      <Image src={imageSrc} boxSize="60" objectFit={"contain"} />
      <Heading
        textAlign={["center", "left"]}
        maxW="200px"
        size={"sm"}
        fontFamily={"sans-serif"}
        noOfLines={3}
        children={title}
      />
      <Text noOfLines={2} children={description} />

      <HStack>
        <Text
          fontWeight={"bold"}
          textTransform="uppercase"
          children={"Creator"}
        />

        <Text
          fontFamily={"body"}
          textTransform="uppercase"
          children={creator}
        />
      </HStack>

      <Heading
        textAlign={"center"}
        size="xs"
        children={`Lectures - ${lectureCount}`}
        textTransform="uppercase"
      />

      <Heading
        size="xs"
        children={`Views - ${views}`}
        textTransform="uppercase"
      />

      <Stack direction={["column", "row"]} alignItems="center">
        <Link to={`/course/${id}`}>
          <Button colorScheme={"yellow"}>Watch Now</Button>
        </Link>
        <Button
          isLoading={loading}
          variant={"ghost"}
          colorScheme={"yellow"}
          onClick={() => addToPlaylistHandler(id)}
        >
          Add to playlist
        </Button>
      </Stack>
    </VStack>
  );
};

const categories = [
  "Web Development",
  "Artificial Intelligence",
  "Data Science",
  "App Development",
  "Data Structures And Algorithms",
  "Game Development",
];

const Courses = () => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  const { loading, courses, error, message } = useSelector(
    (state) => state.course
  );

  const dispatch = useDispatch();

  const addToPlaylistHandler = async (courseId) => {
    console.log("Add to Playlist");
    await dispatch(addToPlaylist(courseId));
    dispatch(loadUser());
  };

  useEffect(() => {
    console.log("Loaded");
    dispatch(getAllCourses(category, keyword));

    if (error) {
      toast.error(error);
      dispatch({
        type: "clearError",
      });
    }
    if (message) {
      toast.success(message);
      dispatch({
        type: "clearMessage",
      });
    }
  }, [category, keyword, message, error, dispatch]);

  return (
    <Container minH={"95vh"} maxW="container.lg" padding={"8"}>
      <Heading children="All Courses" m="8" />

      <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Our Course..."
        type="text"
        focusBorderColor="yellow"
      />

      <HStack
        overflowX={"auto"}
        padding="8"
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {categories.map((category, index) => (
          <Button key={index} onClick={() => setCategory(category)} minW={"60"}>
            <Text children={category} />
          </Button>
        ))}
      </HStack>

      <Stack
        direction={["column", "row"]}
        flexWrap="wrap"
        justifyContent={["flex-start", "space-evenly"]}
        alignItems={["center", "flex-start"]}
      >
        {courses.length > 0 ? (
          courses.map((course) => (
            <Course
              title={course.title}
              key={course._id}
              views={course.views}
              imageSrc={course.poster.url}
              description={course.description}
              id={course._id}
              loading={loading}
              creator={course.createdBy}
              lectureCount={course.numOfVideos}
              addToPlaylistHandler={addToPlaylistHandler}
            />
          ))
        ) : (
          <Heading>Course Not Found</Heading>
        )}
      </Stack>
    </Container>
  );
};

export default Courses;
