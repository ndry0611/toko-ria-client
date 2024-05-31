import { Button, Center, Flex, Space, Text } from "@mantine/core";
import NavigationBar from "../../../component/navigation-bar/navigation-bar";
import PhoneLayout from "../../../component/phone-layout/phone-layout";
import { PhotoPreview } from "../../../component/photo-input";
import {
  NavigationRoutes,
  PublicImageRoutes,
} from "../../../common/constants/route";
import { useToken } from "../../../hooks/use-token";
import { useGetMe } from "../../../api-hooks/user-api";
import { CaretRight, User } from "@phosphor-icons/react";
import TitleText from "../../admin/component/title";
import LoaderView from "../../admin/component/loader-view";
import { useRouter } from "next/router";

export default function ProfilePage() {
  return (
    <PhoneLayout
      centerComponent={<Text fw={700}>Profil</Text>}
      bottomContainer={<NavigationBar />}
    >
      <ProfileContent />
    </PhoneLayout>
  );
}

function ProfileContent() {
  const { handleLogout, token } = useToken();
  const query = useGetMe();
  const { push } = useRouter();

  const profileNav = [
    { title: "Edit Profil", link: `${NavigationRoutes.profile_edit}` },
    { title: "Ubah Password", link: `${NavigationRoutes.change_password}` },
    { title: "Ajukan Keluhan", link: `${NavigationRoutes.complaint}` },
  ];

  return (
    <LoaderView query={query}>
      {(data) => {
        return (
          <Flex direction={"column"}>
            <Center>
              {!!data.file_name ? (
                <PhotoPreview
                  imageUrl={`${PublicImageRoutes.users}${data.file_name}`}
                />
              ) : (
                <User size={128} />
              )}
            </Center>
            <TitleText ta="center">{data.name}</TitleText>
            <Space h={"sm"} />
            {profileNav.map((item) => (
              <Button
                my={8}
                miw={300}
                maw={768}
                w={"100%"}
                variant="outline"
                justify="space-between"
                rightSection={<CaretRight />}
                key={item.link}
                onClick={() => push(item.link)}
              >
                {item.title}
              </Button>
            ))}
            <Button
              my={8}
              miw={300}
              maw={768}
              w={"100%"}
              variant="outline"
              justify="space-between"
              rightSection={<CaretRight />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Flex>
        );
      }}
    </LoaderView>
  );
}
