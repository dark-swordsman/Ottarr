import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import API from "../helpers/API/API";

export default function FileManagement() {
  const [directories, setDirectories] = useState([]);

  useEffect(async () => setDirectories(await API.mediadirectory.getDirectories()), []);

  return (
    <Layout title="File Management">
    </Layout>
  );
}