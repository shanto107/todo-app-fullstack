process.loadEnvFile();

export default function loadEnvVariable(envVariablekey: string) {
    const envVariableValue = process.env[envVariablekey];
    if(!envVariableValue) {
        throw new Error(`Unable to load ENV Variable ${envVariablekey}!`);
    }
    return envVariableValue;
}