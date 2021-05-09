/*
Navicat MySQL Data Transfer

Source Server         : Mysql
Source Server Version : 80023
Source Host           : localhost:3306
Source Database       : springboot_layui

Target Server Type    : MYSQL
Target Server Version : 80023
File Encoding         : 65001

Date: 2021-05-09 22:32:59
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `book`
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `author` varchar(20) DEFAULT NULL,
  `publish` varchar(20) DEFAULT NULL,
  `pages` int DEFAULT NULL,
  `price` float(10,2) DEFAULT NULL,
  `bookcaseid` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ieh6qsxp6q7oydadktc9oc8t2` (`bookcaseid`),
  CONSTRAINT `FK_ieh6qsxp6q7oydadktc9oc8t2` FOREIGN KEY (`bookcaseid`) REFERENCES `bookcase` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2324 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO `book` VALUES ('1', '恐妻家', '伊坂幸太郎', '南海出版公司', '288', '58.00', null);
INSERT INTO `book` VALUES ('2', '追风筝的人', '卡勒德·胡赛尼', '上海人民出版社', '362', '29.00', '1');
INSERT INTO `book` VALUES ('3', '小王子', '安东尼·德·圣-埃克苏佩里', '人民文学出版社', '97', '22.00', '1');
INSERT INTO `book` VALUES ('4', '围城', '钱钟书', '人民文学出版社', '362', '39.00', '3');
INSERT INTO `book` VALUES ('5', '雪国', '川端康成', '南海出版公司', '231', '32.00', '4');
INSERT INTO `book` VALUES ('6', '千只鹤', '川端康成', '南海出版公司', '208', '29.50', '1');
INSERT INTO `book` VALUES ('7', '金色梦乡', '伊坂幸太郎', '南海出版公司', '512', '49.50', '5');
INSERT INTO `book` VALUES ('8', '嫌疑人X的献身', '东野圭吾', '南海出版公司', '251', '28.00', '6');
INSERT INTO `book` VALUES ('9', '库特利亚芙卡的排序', '米泽穗信', '湖南美术出版社', '296', '30.00', '7');
INSERT INTO `book` VALUES ('10', '两人距离的概算', '米泽穗信', '百花洲文艺出版社', '216', '25.00', '6');
INSERT INTO `book` VALUES ('11', '秋季限定栗金饨事件 下', '米泽穗信', '新星出版社', '188', '39.00', '1');
INSERT INTO `book` VALUES ('12', '迟来的翅膀', '米泽穗信', '百花洲文艺出版社', '256', '34.00', '2');
INSERT INTO `book` VALUES ('13', '愚者的片尾', '米泽穗信', '湖南美术出版社', '217', '25.00', '5');
INSERT INTO `book` VALUES ('14', '绕远路的雏人偶', '米泽穗信', '湖南美术出版社', '253', '30.00', '3');
INSERT INTO `book` VALUES ('15', '我今天出门了！', '卡珊德拉·卡林', '四川文艺出版社', '144', '39.80', null);
INSERT INTO `book` VALUES ('16', '活着', '余华', '作家出版社', '191', '20.00', null);
INSERT INTO `book` VALUES ('17', '且听风吟', '村上春树', '上海译文出版社', '141', '11.80', null);
INSERT INTO `book` VALUES ('18', '动物农场', '乔治·奥威尔', '上海译文出版社', '119', '10.00', null);
INSERT INTO `book` VALUES ('19', '古都', '川端康成', '南海出版公司', '320', '39.50', null);
INSERT INTO `book` VALUES ('20', '爱你就像爱生命', '王小波', '上海锦绣文章出版社', '222', '18.00', null);
INSERT INTO `book` VALUES ('21', '心', '夏目漱石', '青岛出版社', '262', '19.80', null);
INSERT INTO `book` VALUES ('22', '冰菓', '米泽穗信', '湖南美术出版社', '195', '25.00', null);
INSERT INTO `book` VALUES ('23', '伊豆的舞女', '川端康成', '南海出版公司', '256', '35.00', null);
INSERT INTO `book` VALUES ('24', '窗边的小豆豆', '黑柳彻子', '南海出版公司', '280', '39.50', null);
INSERT INTO `book` VALUES ('25', '华丽人生', '伊坂幸太郎', ' 译林出版社', '270', '28.00', null);
