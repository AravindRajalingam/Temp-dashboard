import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  CircularProgress,
  Box,
} from "@mui/material";

const API_URL = "https://arduino-7mkq.onrender.com/api/data"; // Replace with your actual endpoint

function App() {
  const [data, setData] = useState([]);
  const [latest, setLatest] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL);
      setData(res.data);
      setLatest(res.data[0]);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="md" style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom align="center">
        🌡️ IoT Temperature Dashboard
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Card
            sx={{
              mb: 4,
              background: "#1976d2",
              color: "white",
              textAlign: "center",
            }}
          >
            <CardContent>
              <Typography variant="h5">Latest Temperature</Typography>
              <Typography variant="h2">
                {latest?.temperature.toFixed(1)}°C
              </Typography>
              <Typography variant="body2">
                {new Date(latest?.created_at).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>

          <Paper elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>ID</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Temperature (°C)</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Timestamp</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.id}</TableCell>
                    <TableCell>{entry.temperature.toFixed(1)}</TableCell>
                    <TableCell>
                      {new Date(entry.created_at).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </>
      )}
    </Container>
  );
}

export default App;
