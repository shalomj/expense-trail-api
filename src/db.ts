import mongoose, { mongo } from 'mongoose';

const DB_CONNECTION = (process.env.DB_CONNECTION as string);

const DB = {

    /**
     * Setup listeners for mongoose connection
     */
    init: function () {
        mongoose.connection.on('connecting', () => console.log('Connecting to database...'));

        mongoose.connection.on('connected', () => console.log(`Database connected: ${mongoose.connection.host}`));

        mongoose.connection.on('error', this._handleError);

        return this;
    },

    /**
     * Connect to database
     */
    connect: async function () {
        try {
            const connectionOptions: mongoose.ConnectionOptions = {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            };

            await mongoose.connect(DB_CONNECTION, connectionOptions);
        } catch (err) {
            this._handleError(err);
        }
    },
    /**
     * Log database error and end the process
     */
    _handleError: (err: any) => {
        console.log(`Database connection error: ${err.message}`);
    
        process.exit(1);
    }
};

export default DB;