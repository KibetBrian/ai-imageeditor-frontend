/* eslint-disable no-magic-numbers */
import { Stack, Typography } from "@mui/material";
import { Link } from "@nextui-org/link";
import { commonColors } from "@nextui-org/theme";

import AuthButton from "./AuthButton";

export default function Auth() {
  return (
    <Stack alignItems={"center"} direction={"row"} height={"100%"} justifyContent={"center"} overflow={"hidden"} p={2}>
      <Stack alignItems={"start"} justifyContent={"center"} spacing={10}>
        <Stack spacing={1}>
          <Typography variant={"h1"}>Sign Up/In</Typography>
          <Typography style={{ color: commonColors.zinc[400] }} variant={"caption"}>
            Sign up to flawlessly edit your photos
          </Typography>
        </Stack>

        <Stack spacing={10}>
          <AuthButton />

          <Stack alignItems={"center"} direction={"row"} flexWrap={"wrap"}>
            <Typography mr={1} variant="caption">
              By proceeding, you agree to the{" "}
            </Typography>
            <Link className="mr-1" href="#" size="sm">
              Terms of Service
            </Link>
            <Typography mr={1} variant="caption">
              {" "}
              and{" "}
            </Typography>
            <Link href="#" size="sm">
              Privacy Policy
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
