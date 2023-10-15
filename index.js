import app from './configs/app.js';
import './configs/database.js';
import { connect } from './configs/database.js';

connect();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;