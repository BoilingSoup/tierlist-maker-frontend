import { NextPage } from "next";
import { useRouter } from "next/router";

const TierList: NextPage = () => {
  const router = useRouter();

  return <pre style={{ whiteSpace: "pre-line" }}>{JSON.stringify(router)}</pre>;
};

export default TierList;
