import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiDom from 'chai-dom';
import jsdom from 'jsdom';
import dotenv from "dotenv";

chai.use(chaiHttp);
chai.use(chaiDom);

const should = chai.should();
const expect = chai.expect;

process.env.NODE_ENV = "testing"
dotenv.config({path: `.env-testing`});

// load app after env
const app = (await import('../app.js')).app;

describe('GET /', () => {
    it('should return index page', async () => {
        const response = await chai.request(app).get('/');
        response.should.have.status(200);

        const dom = new jsdom.JSDOM(response.text);
        const bodyContent = dom.window.document.body.innerHTML;
        expect(bodyContent).contain('<h1>ToDo App</h1>');
        expect(bodyContent).contain('Create a Task');
    });
});

describe('POST /tasks', () => {
    it('create a task', async () => {
        const newTask = {
            title: 'test task',
            description: 'test description',
            dueDate: '2021-01-01',
            importance: 4
        };

        const server = chai.request.agent(app);
        const response = await server.post('/tasks').send({newTask});
        server.close();

     });
});

describe('sortFunction', () => {
    it('should sort tasks by importance', () => {
        const tasks = [
            { importance: 3 },
            { importance: 1 },
            { importance: 2 }
        ];

        const orderBy = 'importance';

        const sortedTasks = tasks.sort((a, b) => {
            if (orderBy === 'importance') {
                return a.importance - b.importance;
            }
        });

        expect(sortedTasks).to.deep.equal([
            { importance: 1 },
            { importance: 2 },
            { importance: 3 }
        ]);
    });
});
