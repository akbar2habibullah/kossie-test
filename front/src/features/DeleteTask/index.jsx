import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useToast, Button, Text, useDisclosure, IconButton } from '@chakra-ui/react'
import React from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { useEvent } from 'effector-react'

import { deleteTodo } from '../../app/event'

function DeleteTask({ task }) {
	const deleteEvent = useEvent(deleteTodo)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const toast = useToast()

	return (
		<>
			<IconButton icon={<FiTrash2 />} isRound='true' onClick={onOpen} />

			<Modal isCentered isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent w='90%'>
					<ModalHeader>Are you sure want delete the task?</ModalHeader>
					<ModalBody>
						<Text>{task.title}</Text>
						<Text>{task.detail}</Text>
					</ModalBody>
					<ModalFooter>
						<Button mr={3} onClick={onClose}>
							No
						</Button>
						<Button
							colorScheme='red'
							onClick={() => {
								deleteEvent(task.id)
								toast({
									title: 'Task has been deleted',
									position: 'top',
									status: 'error',
									duration: 2000,
									isClosable: true,
								})
								onClose()
							}}
						>
							Yes
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default DeleteTask
