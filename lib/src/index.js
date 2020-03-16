/**
 * 1. 满足各种配置，并检查参数
 * 2. 兼容 redux/vuex
 * 3. 处理 websocket 问题
 * 4. 断线重连机制
 * 3. rich client 模式，建立连接时将 schema 发送到后端，并获得初始数据
 * @param config
 * @returns {Function}
 */
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {v4 as uuidv4} from 'uuid';

class RTSFlux {
    createVuexPlugin(config = {}) {
        const mergedConfig = {
            filter: function () {
                return true;
            },
            url: 'http://localhost:8080/socket',
            channel: '/topic',
            ...config
        }

        const socket = new SockJS(mergedConfig.url);
        const client = Stomp.over(socket);
        let sessionId = uuidv4();

        const headers = {
            Authorization: '',
            sessionId
        }

        return store => {
            client.connect(headers, () => {
                console.log('连接成功!');
                client.subscribe('/topic', (message) => {
                    console.log("from broker and to store", message);
                    const data = JSON.parse(message.body);
                    if (message.headers.sessionId != sessionId) {
                        store.commit(data.type, {
                            ...data.payload,
                            processed: true
                        });
                    }
                }, headers);

                store.subscribe(mutation => {
                    if (mutation.payload.processed) {
                        return;
                    }
                    if (mergedConfig.filter(mutation.type)) {
                        client.send('/topic', {sessionId}, JSON.stringify(mutation));
                    }
                })
            }, () => {
                console.log('连接失败!');
            });
        }
    }
}

export default RTSFlux;
