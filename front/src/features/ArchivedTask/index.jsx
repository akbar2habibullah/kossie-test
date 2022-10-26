import React from 'react'
import { Stack, Box, Text, StackDivider, Heading, useToast } from '@chakra-ui/react'
import { useStore, useEvent } from 'effector-react'

import { checkTodo } from '../../app/event'
import { todos } from '../../app/store'

function TaskList() {
	const toast = useToast()
	const tasks = useStore(todos)
	const checkEvent = useEvent(checkTodo)

	if (!tasks.length) {
		return (
			<>
				<Box maxW='80%' py={10}>
					<Heading fontWeight='bold' size='lg' color='blue.500'>
						No Archived
					</Heading>
				</Box>
			</>
		)
	}
	return (
		<>
			<Stack direction='column' w='400px' maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }} spacing={4} alignItems='stretch'>
				{tasks
					.filter((task) => task.checked)
					.sort((a, b) => new Date(a.created) - new Date(b.created))
					.map((task) => (
						<Stack
							key={task.id}
							opacity={0.8}
							direction='column'
							divider={<StackDivider />}
							w='100%'
							onClick={() => {
								checkEvent({ id: task.id, checked: !task.checked })
								toast({
									title: 'Task Unarchived',
									position: 'top',
									status: 'info',
									duration: 2000,
									isClosable: true,
								})
							}}
							cursor='pointer'
							borderColor='gray.100'
							borderWidth='2px'
							p='5'
							borderRadius='lg'
						>
							<Heading fontWeight='bold' size='lg' as='s' bgGradient='linear(to-l, blue.500, green.400)' bgClip='text'>
								{task.title}
							</Heading>
							<Text w='100%' as='s'>
								{task.description}
							</Text>
							<Text w='100%' as='s' color='gray'>
								{new Date(task.created).toUTCString()}
							</Text>
						</Stack>
					))}
			</Stack>
		</>
	)
}

export default TaskList
