import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getPropositionById } from "../../api/services/propositions";

export const getSinglePropositionPageServerSideProps: GetServerSideProps =
  async (ctx: GetServerSidePropsContext) => {
    const { query } = ctx;
    const { propositionId } = query;

    if (!propositionId) {
      return {
        props: {},
        redirect: {
          destination: "/",
        },
      };
    }

    const propositionRes = await getPropositionById(
      parseInt(propositionId.toString())
    );

    if (propositionRes.data) {
      return {
        props: {
          ssrProposition: propositionRes.data,
        },
      };
    } else
      return {
        props: {},
        redirect: {
          destination: "/",
        },
      };
  };
