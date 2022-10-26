import { Modal, ModalOverlay, ModalContent, useToast, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, Textarea, FormControl, useDisclosure, IconButton } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { useEvent } from 'effector-react'
import { FiEdit } from 'react-icons/fi'

import { updateTodo } from '../../app/event'

function UpdateTask({ task }) {
	const updateEvent = useEvent(updateTodo)
	const toast = useToast()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [title, setTitle] = useState()
	const [detail, setDetail] = useState()

	const initialRef = React.useRef()

	useEffect(() => {
		setTitle(task.title)
		setDetail(task.description)
	}, [task])

	function handleSubmit() {
		if (!title.trim() || !detail.trim()) {
			toast({
				title: 'Please fill the task and detail',
				position: 'top',
				status: 'warning',
				duration: 2000,
				isClosable: true,
			})

			return setTitle('')
		}

		updateEvent({ id: task.id, title, desc: detail })

		setTitle('')
		setDetail('')
		toast({
			title: 'Task Updated',
			position: 'top',
			status: 'info',
			duration: 2000,
			isClosable: true,
		})

		onClose()
	}

	return (
		<>
			<IconButton icon={<FiEdit />} isRound='true' onClick={onOpen} />

			<Modal isCentered initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent w='90%'>
					<ModalHeader>Update existing task</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl mb={3}>
							<Input ref={initialRef} placeholder='Please fill the title' defaultValue={task.title} onChange={(e) => setTitle(e.target.value)} onFocus={(e) => setTitle(e.target.value)} />
						</FormControl>
						<FormControl>
							<Textarea placeholder='Please fill the detail' defaultValue={task.description} onChange={(e) => setDetail(e.target.value)} onFocus={(e) => setDetail(e.target.value)} />
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button mr={3} onClick={onClose}>
							Cancel
						</Button>
						<Button colorScheme='green' onClick={() => handleSubmit()}>
							Save
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default UpdateTask
