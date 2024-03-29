import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import { Can } from "../components/Can";

import { setupAPIClient } from "../services/api";

import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function DashBoard() {
  const { user, signOut } = useAuth();

  useEffect(() => {
    api.get('/me')
      .then(response => {})
      .catch((err) => {
        console.log(err);
      });
  })

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>

      <button onClick={signOut}>Sign out</button>

      <Can permissions={['metrics.list']}>
          <div>Métricas</div>
      </Can>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/me');

  return {
    props: {}
  }
})