DELIMITER //

CREATE PROCEDURE InsertMessage(IN senderID INTEGER, IN receiverID INTEGER, IN message VARCHAR(2550))
BEGIN
  INSERT INTO Message(message) VALUES(message);
  INSERT INTO UserMessage(message_id ,sender_id, receiver_id) VALUES(LAST_INSERT_ID(), senderID, receiverID);
END //

DELIMITER ;