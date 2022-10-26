import { createEffect } from 'effector'
import { gql } from '@apollo/client'
import client from '../api/gql'
import { todos } from './store'

export const fetchTodo = createEffect(() =>
	client
		.query({
			query: gql`
				query {
					allTodo {
						id
						title
						description
						checked
						created
					}
				}
			`,
		})
		.then((result) => result.data.allTodo)
)

export const addTodo = createEffect(({ title, desc }) =>
	client
		.mutate({
			mutation: gql`
				mutation addTodoMutation($title: String!, $description: String) {
					addTodo(title: $title, description: $description) {
						code
						msg
						todo {
							id
							title
							description
							checked
							created
						}
					}
				}
			`,
			variables: {
				title,
				description: desc,
			},
		})
		.then((result) => {
			return result.data.addTodo.todo
		})
		.catch((error) => {
			console.log(error)
			return error
		})
)

export const deleteTodo = createEffect((id) =>
	client
		.mutate({
			mutation: gql`
				mutation deleteTodoMutation($id: ID!) {
					deleteTodo(id: $id) {
						code
						msg
						id
					}
				}
			`,
			variables: {
				id,
			},
		})
		.then((result) => {
			return result.data.deleteTodo.id
		})
		.catch((error) => {
			console.log(error)
			return error
		})
)

export const updateTodo = createEffect(({ id, title, desc }) =>
	client
		.mutate({
			mutation: gql`
				mutation updateTodoMutation($id: ID!, $title: String!, $description: String) {
					updateTodo(id: $id, title: $title, description: $description) {
						code
						msg
						todo {
							id
							title
							description
							created
							checked
						}
					}
				}
			`,
			variables: {
				id,
				title,
				description: desc,
			},
		})
		.then((result) => {
			return result.data.updateTodo.todo
		})
		.catch((error) => {
			console.log(error)
			return error
		})
)

export const checkTodo = createEffect(({ id, checked }) =>
	client
		.mutate({
			mutation: gql`
				mutation checkTodoMutation($id: ID!, $checked: Boolean!) {
					checkTodo(id: $id, checked: $checked) {
						code
						msg
						todo {
							id
							checked
						}
					}
				}
			`,
			variables: {
				id,
				checked,
			},
		})
		.then((result) => {
			return result.data.checkTodo.todo
		})
		.catch((error) => {
			console.log(error)
			return error
		})
)

todos
	.on(fetchTodo.doneData, (_, payload) => {
		return payload
	})
	.on(addTodo.doneData, (state, payload) => {
		return [...state, payload]
	})
	.on(deleteTodo.doneData, (state, payload) => {
		return state.filter((task) => task.id !== payload)
	})
	.on(updateTodo.doneData, (state, payload) => {
		return state.map((task) => {
			if (task.id === payload.id) {
				return payload
			}
			return task
		})
	})
	.on(checkTodo.doneData, (state, payload) => {
		return state.map((task) => {
			if (task.id === payload.id) {
				return { ...task, checked: payload.checked }
			}
			return task
		})
	})
