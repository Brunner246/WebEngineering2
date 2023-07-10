import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiDom from 'chai-dom';
import jsdom from 'jsdom';
import dotenv from "dotenv";
import { Task, TaskStore } from '../services/taskService.js';
import sinon from "sinon";

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

describe('Task API', () => {
    it('should create a task in the DB', async () => {
        const newTask = {
            title: 'Test Task',
            description: 'This is a test task',
            dueDate: '2023-07-10',
            importance: 5
        };

        const res = await chai.request(app)
            .post('/tasks')
            .send(newTask);

        expect(res).to.have.status(200);
    });
});

describe('Task', () => {
    describe('constructor', () => {
        it('should initialize task properties correctly', () => {
            const title = 'Test Task 2';
            const description = 'This is a test task, but number two';
            const dueDate = new Date('2023-07-10');
            const importance = 3;

            const task = new Task(title, description, dueDate, importance);

            expect(task.title).to.equal(title);
            expect(task.description).to.equal(description);
            expect(task.creationDate).to.be.an.instanceOf(Date);
            expect(task.dueDate).to.equal(dueDate);
            expect(task.importance).to.equal(importance);
            expect(task.completed).to.be.false;
        });

        it('should set default importance when not provided', () => {
            const title = 'Test Task 2';
            const description = 'This is a test task, but number two';
            const dueDate = new Date('2023-07-10');

            const task = new Task(title, description, dueDate);

            expect(task.importance).to.equal(0);
        });
    });

    describe('formatDueDate', () => {
        it('should return formatted due date', () => {
            const task = new Task();

            const dueDate = new Date('2023-07-10');
            const formattedDueDate = task.formatDueDate(dueDate);

            expect(formattedDueDate).to.equal('10/7/2023');
        });

    });

    describe('isOverdue', () => {
        it('should return true if due date is in the past', () => {
            const task = new Task();
            task.dueDate = new Date('2020-01-01');

            const isOverdue = task.isOverdue();

            expect(isOverdue).to.be.true;
        });

        it('should return false if due date is in the future', () => {
            const task = new Task();
            task.dueDate = new Date('2025-01-01');

            const isOverdue = task.isOverdue();

            expect(isOverdue).to.be.false;
        });
    });
});

describe('TaskStore', () => {
    let taskStore;
    let dbMock;

    beforeEach(() => {
        dbMock = {
            insert: sinon.stub(),
        };

        taskStore = new TaskStore();
        taskStore.db = dbMock;
    });

    describe('add', () => {
        it('should add a task to the database', async () => {
            const task = new Task();
            dbMock.insert.yields(null, task);

            const addedTask = await taskStore.add('Test Task', 'Test description', new Date(), 3);

            expect(dbMock.insert.calledOnce).to.be.true;
            expect(addedTask).to.equal(task);
        });
    });
});
