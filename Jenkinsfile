pipeline {
    agent { label 'docker-java-node-agent' }
    environment {

        SSH_ADDRESS = credentials('SSH-HOST-ADDRESS')
        HOST_IP = credentials('HOST_IP')
        
        VITE_API_KEY = credentials('ENV_VITE_API_KEY')
        VITE_AUTH_DOMAIN = credentials('ENV_VITE_AUTH_DOMAIN')
        VITE_PROJECT_ID = credentials('ENV_VITE_PROJECT_ID')
        VITE_STORAGE_BUCKET = credentials('ENV_VITE_STORAGE_BUCKET')
        VITE_MESSAGING_SENDER_ID = credentials('ENV_VITE_MESSAGING_SENDER_ID')
        VITE_APP_ID = credentials('ENV_VITE_APP_ID')
    }
    stages {
        stage('Setup') {
            steps {
                echo 'Setting upp SSH for known_hosts'
                sh 'mkdir -p ~/.ssh'
                sh 'chmod 700 ~/.ssh'
                sh 'ssh-keyscan -H ${HOST_IP} >> ~/.ssh/known_hosts'
                sh 'chmod 644 ~/.ssh/known_hosts'
            }
        }
        stage('Checkout') {
            steps {
                echo 'Checking out source code'
                checkout scm // Checks out source code to workspace
            }
        }
        stage('Test') {
            steps {
                //no tests yet
                echo 'No tests yet, skipping to next step.'
            }
        }
        stage('Install') {
            steps {
                echo 'Installing dependencies'
                sh 'npm install' // Install 
            }
        }
        stage('Build') {
            steps {
                echo 'Building project'
                sh """
                export VITE_API_USER='REDACTED' 
                export VITE_API_PW='REDACTED' 
                npm run build
                """ 
                echo 'Build done'
            }
        }
        stage('Deploy') {
            when {
                branch 'master' 
            }
            steps {
                echo 'Initiating deploy'
                    sshagent(credentials: ['SSH-agent-to-ubuntu']) {
                    
                    sh '''
                    ### We cannot SCP directly into a docker container, thus we must make these intermediary steps:
                    # 1. Create a temporary directory on the host
                    ssh ${SSH_ADDRESS} 'mkdir -p /tmp/deploy'
                    
                    # 2. Secure copy the built files to the temporary directory
                    scp -r dist/* ${SSH_ADDRESS}:/tmp/deploy
                    
                    # 3. Use docker cp to move the files from the host to the Docker container
                    ssh ${SSH_ADDRESS} '
                        docker cp /tmp/deploy/. nginx-nginx-1:/usr/share/nginx/html
                        docker exec nginx-nginx-1 nginx -s reload
                        rm -rf /tmp/deploy  # Clean up the temporary directory
                    '
                    '''
                    
                    }
                echo 'Deploy done'
                }
            }
        }
    
    post {
            failure {
                script {
                    if (env.BRANCH_NAME == 'master') {
                        echo 'The build and deployment on master failed.'
                    } else {
                        echo 'The build failed.'
                    }
                }
            }
            success {
                script {
                    if (env.BRANCH_NAME == 'master') {
                        echo 'Build and deployment on master were successful.'
                    } else {
                        echo 'Build was successful.'
                    }
                }
            }
        }
     }
