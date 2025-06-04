import {getLogger} from '../loggerFactory';
import {Example, ExampleSchema} from "../models/exampleModel";

const log = getLogger('service.exampleService');

const sayHello: () => Example = () => {
    const msg = "hello world!"
    const exampleModel: Example = ExampleSchema.parse({msg});
    log.info(msg)
    return exampleModel
};


export {
    sayHello,
}

