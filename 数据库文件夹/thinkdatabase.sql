/*
Navicat MySQL Data Transfer

Source Server         : ThinkDataBaseConn
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : thinkdatabase

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2017-11-11 23:01:50
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `ArticleId` int(11) NOT NULL AUTO_INCREMENT,
  `ArticleTitle` varchar(255) DEFAULT NULL,
  `ArticleTime` time DEFAULT NULL,
  `ArticleContent` varchar(255) DEFAULT NULL,
  `ArticleAuother` int(11) DEFAULT NULL,
  `ArticleType` int(11) DEFAULT NULL,
  PRIMARY KEY (`ArticleId`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('1', '测试首页', null, '这是首页文章的测试', '1', '1');
INSERT INTO `article` VALUES ('2', '测试军事类', null, '这是军事类违章的测试', '1', '3');
INSERT INTO `article` VALUES ('3', 'test1', null, '1', '1', '1');
INSERT INTO `article` VALUES ('4', 'test2', null, '2', '1', '1');
INSERT INTO `article` VALUES ('5', 'test3', null, '3', '1', '1');
INSERT INTO `article` VALUES ('6', 'test4', null, '4', '1', '1');
INSERT INTO `article` VALUES ('7', '新添加文章', null, '没错，我就是你爸爸', '1', '1');
INSERT INTO `article` VALUES ('8', '新添加文章', null, '没错，我就是你爸爸', '1', '1');
INSERT INTO `article` VALUES ('9', '新添加文章', null, '没错，我就是你爸爸', '1', '1');
INSERT INTO `article` VALUES ('11', '1231', null, '2131321', '1', '1');
INSERT INTO `article` VALUES ('13', '8967896', null, '68796896986986', '1', '1');

-- ----------------------------
-- Table structure for login
-- ----------------------------
DROP TABLE IF EXISTS `login`;
CREATE TABLE `login` (
  `LoginId` int(11) NOT NULL AUTO_INCREMENT,
  `LoginUserName` varchar(32) DEFAULT NULL,
  `LoginPassWord` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`LoginId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of login
-- ----------------------------
INSERT INTO `login` VALUES ('1', 'linlin', '123456');

-- ----------------------------
-- Table structure for menutype
-- ----------------------------
DROP TABLE IF EXISTS `menutype`;
CREATE TABLE `menutype` (
  `TypeId` int(11) NOT NULL AUTO_INCREMENT,
  `TypeName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`TypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of menutype
-- ----------------------------
INSERT INTO `menutype` VALUES ('1', '科技类');
INSERT INTO `menutype` VALUES ('3', '军事类');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `UserId` int(11) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(255) DEFAULT NULL,
  `UserIcon` blob,
  `LoginId` int(11) DEFAULT NULL,
  PRIMARY KEY (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'linlin', null, '1');
