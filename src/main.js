import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import UsersFooter from './components/users/UsersFooter.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/teams'}, // redirect to different route
        {
            name: 'teams', 
            path: '/teams',
            // different component in different router-views 
            components: {
                default: TeamsList, // router-link without name
                footer: TeamsFooter
            }, 
            children: [
                { name: 'team-members', path: ':teamId', component: TeamMembers, props: true },
            ] 
        },
        { path: '/users', components: {
            default: UsersList, 
            footer: UsersFooter
        } },
        // { path: '/:notFound(.*)', redirect: '/teams'}
        { path: '/:notFound(.*)', component: NotFound}
    ],
    linkActiveClass: 'active',
    /**
     * Method called every time the page is refreshed.
     * Help to control the scroll of the page when navigating in the application.
     * @param {*} to : route where I'm going
     * @param {*} from : router where I'm coming from
     * @param {*} savedPosition : scroll position that I had before I clicked the 'back' button (otherwise is null). Contains fields left e top.
     */
    scrollBehavior(to, from, savedPosition) {
        // console.log(to);
        // console.log(from);
        // console.log(savedPosition);

        if(savedPosition) {
            return savedPosition;
        }

        return {left: 0, top: 0}; // top of the page
    }
});

const app = createApp(App)

app.use(router);

app.mount('#app');
