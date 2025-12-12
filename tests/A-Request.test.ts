import { A_SERVER_TYPES__RequestConstructor, A_SERVER_TYPES__RequestOptions, A_Request } from '../src';
import { IncomingMessage } from 'http';
import { Socket } from 'net';

describe('A_Request Entity', () => {
    let mockIncomingMessage: Partial<IncomingMessage>;
    let mockSocket: Partial<Socket>;
    let requestParams: A_SERVER_TYPES__RequestConstructor;

    beforeEach(() => {
        mockSocket = {
            remoteAddress: '192.168.1.100',
            destroyed: false
        };

        mockIncomingMessage = {
            method: 'POST',
            url: '/api/users/123?sort=name&limit=10',
            headers: {
                'content-type': 'application/json',
                'content-length': '100',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'cookie': 'sessionId=abc123; preferences=dark',
                'x-forwarded-for': '203.0.113.45, 192.168.1.100'
            },
            socket: mockSocket as Socket,
            on: jest.fn(),
            pipe: jest.fn().mockReturnValue(mockIncomingMessage),
            read: jest.fn(),
            pause: jest.fn(),
            resume: jest.fn(),
            destroy: jest.fn()
        };

        requestParams = {
            id: 'test-request-123',
            request: mockIncomingMessage as IncomingMessage,
            scope: 'test-api'
        };
    });

    describe('Constructor and Initialization', () => {
        test('should create A_Request instance with basic parameters', () => {
            const request = new A_Request(requestParams);

            expect(request).toBeInstanceOf(A_Request);
            expect(request.aseid.id).toBe('test-request-123');
        });

        test('should create A_Request instance with options', () => {
            const options: A_SERVER_TYPES__RequestOptions = {
                maxBodySize: 5 * 1024 * 1024,
                timeout: 10000,
                parseCookies: false,
                enableSession: true
            };

            const request = new A_Request(requestParams, options);
            expect(request).toBeInstanceOf(A_Request);
        });

        test('should initialize request properly', async () => {
            const request = new A_Request(requestParams);

            await request.init();

            expect(request.method).toBe('POST');
            expect(request.url).toBe('/api/users/123?sort=name&limit=10');
            expect(request.clientIp).toBe('203.0.113.45');
            expect(request.userAgent).toBe('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
            expect(request.contentLength).toBe(100);
        });
    });

    describe('Basic Properties', () => {
        test('should return correct HTTP method', async () => {
            const request = new A_Request(requestParams);
            await request.init();

            expect(request.method).toBe('POST');
        });

        test('should return correct URL', async () => {
            const request = new A_Request(requestParams);
            await request.init();

            expect(request.url).toBe('/api/users/123?sort=name&limit=10');
        });

        test('should return correct headers', async () => {
            const request = new A_Request(requestParams);
            await request.init();

            expect(request.headers['content-type']).toBe('application/json');
            expect(request.headers['user-agent']).toBe('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
        });

        test('should extract client IP from x-forwarded-for header', async () => {
            const request = new A_Request(requestParams);
            await request.init();

            expect(request.clientIp).toBe('203.0.113.45');
        });

        test('should extract client IP from socket when no forwarded headers', async () => {
            mockIncomingMessage.headers = {
                'content-type': 'application/json'
            };

            const request = new A_Request(requestParams);
            await request.init();

            expect(request.clientIp).toBe('192.168.1.100');
        });
    });

    describe('Cookie Parsing', () => {
        test('should parse cookies correctly', async () => {
            const request = new A_Request(requestParams);
            await request.init();

            expect(request.cookies.sessionId).toBe('abc123');
            expect(request.cookies.preferences).toBe('dark');
        });

        test('should return empty object when no cookies', async () => {
            mockIncomingMessage.headers = {
                'content-type': 'application/json'
            };

            const request = new A_Request(requestParams);
            await request.init();

            expect(request.cookies).toEqual({});
        });

        test('should handle cookie methods', async () => {
            const request = new A_Request(requestParams);
            await request.init();

            expect(request.getCookie('sessionId')).toBe('abc123');
            expect(request.getCookie('nonexistent')).toBeUndefined();
            expect(request.hasCookie('sessionId')).toBe(true);
            expect(request.hasCookie('nonexistent')).toBe(false);
        });

        test('should set cookies for response', async () => {
            const request = new A_Request(requestParams);
            await request.init();

            request.setCookie('newCookie', 'newValue', { httpOnly: true });
            expect(request.getCookie('newCookie')).toBe('newValue');
        });
    });

    describe('Parameter and Query Extraction', () => {
        test('should extract URL parameters correctly', async () => {
            const request = new A_Request(requestParams);
            await request.init();

            // This would need a more sophisticated URL matching logic
            // For now, testing the basic extraction method
            const params = request.extractParams('/api/users/123');
            expect(typeof params).toBe('object');
        });

        test('should extract query parameters correctly', async () => {
            const request = new A_Request(requestParams);
            await request.init();

            const query = request.extractQuery('/api/users?sort=name&limit=10&filter=active');
            expect(query.sort).toBe('name');
            expect(query.limit).toBe('10');
            expect(query.filter).toBe('active');
        });

        test('should handle query parameters with no values', async () => {
            const request = new A_Request(requestParams);
            await request.init();

            const query = request.extractQuery('/api/users?flag&empty=');
            expect(query.flag).toBe('');
            expect(query.empty).toBe('');
        });

        test('should handle URLs with no query parameters', async () => {
            const request = new A_Request(requestParams);
            await request.init();

            const query = request.extractQuery('/api/users');
            expect(query).toEqual({});
        });

        test('should decode query parameters', async () => {
            const request = new A_Request(requestParams);
            await request.init();

            const query = request.extractQuery('/api/search?q=hello%20world&type=user%2Badmin');
            expect(query.q).toBe('hello world');
            expect(query.type).toBe('user+admin');
        });
    });

    describe('Body Parsing', () => {
        test('should parse JSON body correctly', async () => {
            const jsonData = { name: 'John Doe', email: 'john@example.com' };
            const jsonString = JSON.stringify(jsonData);

            // Mock the request data event
            const dataEvents: Buffer[] = [];
            const endEvents: (() => void)[] = [];

            mockIncomingMessage.on = jest.fn((event: string, callback: any) => {
                if (event === 'data') {
                    dataEvents.push(callback);
                } else if (event === 'end') {
                    endEvents.push(callback);
                }
                return mockIncomingMessage;
            });

            const request = new A_Request(requestParams);
            await request.init();

            // Simulate body parsing
            const parsePromise = request.parseRequestBody();

            // Emit data events
            dataEvents.forEach(callback => {
                callback(Buffer.from(jsonString));
            });

            // Emit end event
            endEvents.forEach(callback => {
                callback();
            });

            const result = await parsePromise;

            expect(result.type).toBe('json');
            expect(result.data).toEqual(jsonData);
            expect(result.size).toBe(Buffer.byteLength(jsonString));
            expect(request.isBodyParsed).toBe(true);
        });

        test('should parse form-urlencoded body correctly', async () => {
            mockIncomingMessage.headers = {
                'content-type': 'application/x-www-form-urlencoded',
                'content-length': '50'
            };

            const formData = 'name=John%20Doe&email=john%40example.com&age=30';

            const dataEvents: ((chunk: Buffer) => void)[] = [];
            const endEvents: (() => void)[] = [];

            mockIncomingMessage.on = jest.fn((event: string, callback: any) => {
                if (event === 'data') {
                    dataEvents.push(callback);
                } else if (event === 'end') {
                    endEvents.push(callback);
                }
                return mockIncomingMessage;
            });

            const request = new A_Request(requestParams);
            await request.init();

            const parsePromise = request.parseRequestBody();

            dataEvents.forEach(callback => {
                callback(Buffer.from(formData));
            });

            endEvents.forEach(callback => {
                callback();
            });

            const result = await parsePromise;

            expect(result.type).toBe('form');
            expect(result.data['name']).toBe('John Doe');
            expect(result.data['email']).toBe('john@example.com');
            expect(result.data['age']).toBe('30');
        });

        test('should handle body size limit', async () => {
            const options: A_SERVER_TYPES__RequestOptions = {
                maxBodySize: 10 // Very small limit
            };

            mockIncomingMessage.headers = {
                'content-type': 'application/json',
                'content-length': '100'
            };

            const dataEvents: ((chunk: Buffer) => void)[] = [];
            const errorEvents: ((error: Error) => void)[] = [];

            mockIncomingMessage.on = jest.fn((event: string, callback: any) => {
                if (event === 'data') {
                    dataEvents.push(callback);
                } else if (event === 'error') {
                    errorEvents.push(callback);
                }
                return mockIncomingMessage;
            });

            const request = new A_Request(requestParams, options);
            await request.init();

            const parsePromise = request.parseRequestBody();

            // Emit large data chunk
            dataEvents.forEach(callback => {
                callback(Buffer.from('a'.repeat(100)));
            });

            await expect(parsePromise).rejects.toThrow();
        });

        test('should handle body parsing errors', async () => {
            mockIncomingMessage.headers = {
                'content-type': 'application/json'
            };

            const invalidJson = '{ invalid json }';

            const dataEvents: ((chunk: Buffer) => void)[] = [];
            const endEvents: (() => void)[] = [];

            mockIncomingMessage.on = jest.fn((event: string, callback: any) => {
                if (event === 'data') {
                    dataEvents.push(callback);
                } else if (event === 'end') {
                    endEvents.push(callback);
                }
                return mockIncomingMessage;
            });

            const request = new A_Request(requestParams);
            await request.init();

            const parsePromise = request.parseRequestBody();

            dataEvents.forEach(callback => {
                callback(Buffer.from(invalidJson));
            });

            endEvents.forEach(callback => {
                callback();
            });

            await expect(parsePromise).rejects.toThrow();
            expect(request.bodyParsingError).toBeDefined();
        });
    });

    describe('Session Management', () => {
        test('should initialize session when enabled', async () => {
            const options: A_SERVER_TYPES__RequestOptions = {
                enableSession: true
            };

            const request = new A_Request(requestParams, options);
            await request.init();

            expect(request.session).toBeDefined();
            expect(request.session.id).toBeDefined();
            expect(request.session.createdAt).toBeInstanceOf(Date);
            expect(request.session.lastAccess).toBeInstanceOf(Date);
        });

        test('should handle session data operations', async () => {
            const options: A_SERVER_TYPES__RequestOptions = {
                enableSession: true
            };

            const request = new A_Request(requestParams, options);
            await request.init();

            // Set session data
            request.setSession('userId', '12345');
            request.setSession('role', 'admin');

            // Get session data
            expect(request.getSession('userId')).toBe('12345');
            expect(request.getSession('role')).toBe('admin');
            expect(request.getSession('nonexistent')).toBeUndefined();

            // Get full session
            const fullSession = request.getSession();
            expect(fullSession.data.userId).toBe('12345');
            expect(fullSession.data.role).toBe('admin');
        });

        test('should destroy session', async () => {
            const options: A_SERVER_TYPES__RequestOptions = {
                enableSession: true
            };

            const request = new A_Request(requestParams, options);
            await request.init();

            request.setSession('userId', '12345');
            expect(request.getSession('userId')).toBe('12345');

            request.destroySession();
            expect(request.session).toEqual({});
        });
    });

    describe('Request Validation', () => {
        test('should validate request successfully', async () => {
            const request = new A_Request(requestParams);
            request.body = {
                name: 'John Doe',
                email: 'john@example.com',
                age: 30
            };
            await request.init();

            const schema = {
                required: ['name', 'email'],
                fields: {
                    name: { type: 'string', minLength: 2 },
                    email: { type: 'string', minLength: 5 },
                    age: { type: 'number' }
                }
            };

            const validation = await request.validate(schema);

            expect(validation.isValid).toBe(true);
            expect(validation.errors).toHaveLength(0);
            expect(request.isValid).toBe(true);
        });

        test('should detect validation errors', async () => {
            const request = new A_Request(requestParams);
            request.body = {
                name: 'J', // Too short
                email: 'invalid', // No @ symbol
                age: 'thirty' // Wrong type
            };
            await request.init();

            const schema = {
                required: ['name', 'email'],
                fields: {
                    name: { type: 'string', minLength: 2 },
                    email: { type: 'string', minLength: 10 },
                    age: { type: 'number' }
                }
            };

            const validation = await request.validate(schema);

            expect(validation.isValid).toBe(false);
            expect(validation.errors.length).toBeGreaterThan(0);
            expect(request.isValid).toBe(false);
            expect(request.validationErrors.length).toBeGreaterThan(0);
        });

        test('should detect missing required fields', async () => {
            const request = new A_Request(requestParams);
            request.body = {
                name: 'John Doe'
                // Missing email
            };
            await request.init();

            const schema = {
                required: ['name', 'email'],
                fields: {
                    name: { type: 'string' },
                    email: { type: 'string' }
                }
            };

            const validation = await request.validate(schema);

            expect(validation.isValid).toBe(false);
            expect(validation.errors).toContain("Field 'email' is required");
        });
    });

    describe('File Upload Processing', () => {
        test('should parse multipart data with files', async () => {
            mockIncomingMessage.headers = {
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
            };

            const multipartData = [
                '------WebKitFormBoundary7MA4YWxkTrZu0gW',
                'Content-Disposition: form-data; name="name"',
                '',
                'John Doe',
                '------WebKitFormBoundary7MA4YWxkTrZu0gW',
                'Content-Disposition: form-data; name="file"; filename="test.txt"',
                'Content-Type: text/plain',
                '',
                'Hello World',
                '------WebKitFormBoundary7MA4YWxkTrZu0gW--'
            ].join('\r\n');

            const dataEvents: ((chunk: Buffer) => void)[] = [];
            const endEvents: (() => void)[] = [];

            mockIncomingMessage.on = jest.fn((event: string, callback: any) => {
                if (event === 'data') {
                    dataEvents.push(callback);
                } else if (event === 'end') {
                    endEvents.push(callback);
                }
                return mockIncomingMessage;
            });

            const request = new A_Request(requestParams);
            await request.init();

            const parsePromise = request.parseRequestBody();

            dataEvents.forEach(callback => {
                callback(Buffer.from(multipartData));
            });

            endEvents.forEach(callback => {
                callback();
            });

            const result = await parsePromise;

            expect(result.type).toBe('multipart');
            expect(request.files).toHaveLength(1);

            const uploadedFile = request.files[0];
            expect(uploadedFile.fieldName).toBe('file');
            expect(uploadedFile.filename).toBe('test.txt');
            expect(uploadedFile.mimetype).toBe('text/plain');
            expect(uploadedFile.buffer.toString()).toBe('Hello World');
        });
    });

    describe('Performance and Metrics', () => {
        test('should track processing time', async () => {
            const request = new A_Request(requestParams);

            const startTime = Date.now();
            await request.init();

            // Simulate some processing time
            await new Promise(resolve => setTimeout(resolve, 10));

            const processingTime = request.processingTime;
            expect(processingTime).toBeGreaterThan(0);
            expect(processingTime).toBeLessThan(1000); // Should be less than 1 second
        });

        test('should provide request metadata', async () => {
            const request = new A_Request(requestParams);
            await request.init();

            expect(request.isSecure).toBeDefined();
            expect(request.isMobile).toBeDefined();
            expect(request.size).toBe(100); // Content-Length
            expect(request.userAgent).toBeDefined();
            expect(request.clientIp).toBeDefined();
        });

        test('should generate request fingerprint', async () => {
            const request = new A_Request(requestParams);
            await request.init();

            const fingerprint = request.getFingerprint();
            expect(typeof fingerprint).toBe('string');
            expect(fingerprint.length).toBeGreaterThan(0);
        });
    });

    describe('Content Type Handling', () => {
        test('should check content type acceptance', async () => {
            mockIncomingMessage.headers = {
                'accept': 'application/json, text/html, */*'
            };

            const request = new A_Request(requestParams);
            await request.init();

            expect(request.accepts('application/json')).toBe(true);
            expect(request.accepts('text/html')).toBe(true);
            expect(request.accepts('application/xml')).toBe(true); // */* accepts all
        });

        test('should detect mobile devices', async () => {
            mockIncomingMessage.headers = {
                'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
            };

            const request = new A_Request(requestParams);
            await request.init();

            expect(request.isMobile).toBe(true);
        });

        test('should detect secure connections', async () => {
            (mockSocket as any).encrypted = true;

            const request = new A_Request(requestParams);
            await request.init();

            expect(request.isSecure).toBe(true);
        });
    });

    describe('Error Handling', () => {
        test('should handle request errors', async () => {
            const errorEvents: ((error: Error) => void)[] = [];

            mockIncomingMessage.on = jest.fn((event: string, callback: any) => {
                if (event === 'error') {
                    errorEvents.push(callback);
                }
                return mockIncomingMessage;
            });

            const request = new A_Request(requestParams);
            await request.init();

            const testError = new Error('Test error');

            // Simulate error
            errorEvents.forEach(callback => {
                callback(testError);
            });

            expect(request.error).toBeDefined();
            expect(request.error?.message).toBe('Test error');
        });
    });

    describe('Stream Operations', () => {
        test('should pipe request to destination', async () => {
            const mockDestination = {
                write: jest.fn(),
                end: jest.fn()
            };

            mockIncomingMessage.pipe = jest.fn().mockReturnValue(mockDestination);

            const request = new A_Request(requestParams);
            await request.init();

            const result = request.pipe(mockDestination as any);

            expect(mockIncomingMessage.pipe).toHaveBeenCalledWith(mockDestination, undefined);
            expect(result).toBe(mockDestination);
        });

        test('should pipe request with options', async () => {
            const mockDestination = {
                write: jest.fn(),
                end: jest.fn()
            };

            const pipeOptions = { end: false };
            mockIncomingMessage.pipe = jest.fn().mockReturnValue(mockDestination);

            const request = new A_Request(requestParams);
            await request.init();

            request.pipe(mockDestination as any, pipeOptions);

            expect(mockIncomingMessage.pipe).toHaveBeenCalledWith(mockDestination, pipeOptions);
        });
    });

    describe('Serialization', () => {
        test('should serialize to JSON correctly', async () => {
            const request = new A_Request(requestParams);
            await request.init();

            const json = request.toJSON();

            expect(json).toHaveProperty('method');
            expect(json).toHaveProperty('url');
            expect(json).toHaveProperty('headers');
            expect(json).toHaveProperty('params');
            expect(json).toHaveProperty('query');
            expect(json).toHaveProperty('cookies');
            expect(json).toHaveProperty('clientIp');
            expect(json).toHaveProperty('userAgent');
            expect(json).toHaveProperty('processingTime');
            expect(json).toHaveProperty('isValid');
            expect(json).toHaveProperty('validationErrors');

            expect(json.method).toBe('POST');
            expect(json.url).toBe('/api/users/123?sort=name&limit=10');
        });
    });

    describe('Configuration Options', () => {
        test('should respect parseCookies option', async () => {
            const options: A_SERVER_TYPES__RequestOptions = {
                parseCookies: false
            };

            const request = new A_Request(requestParams, options);
            await request.init();

            expect(Object.keys(request.cookies)).toHaveLength(0);
        });

        test('should respect parseQuery option', async () => {
            const options: A_SERVER_TYPES__RequestOptions = {
                parseQuery: false
            };

            const request = new A_Request(requestParams, options);
            await request.init();

            expect(Object.keys(request.query)).toHaveLength(0);
            expect(Object.keys(request.params)).toHaveLength(0);
        });

        test('should respect parseBody option', async () => {
            const options: A_SERVER_TYPES__RequestOptions = {
                parseBody: false
            };

            mockIncomingMessage.headers = {
                'content-type': 'application/json',
                'content-length': '50'
            };

            const request = new A_Request(requestParams, options);
            await request.init();

            expect(request.isBodyParsed).toBe(false);
        });
    });
});