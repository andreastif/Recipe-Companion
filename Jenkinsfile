pipeline {
    agent { label 'docker-java-node-agent' }
    environment {
        REGISTRY_CREDENTIALS_ID = 'andtif-registry-credentials'
        REGISTRY_URL = 'registry.andtif.codes'
        IMAGE = 'recipe-react'
        TAG = 'latest'
        
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
                sh 'mkdir -p ~/.ssh'
                sh 'chmod 700 ~/.ssh'
                sh 'ssh-keyscan -H 192.168.68.134 >> ~/.ssh/known_hosts'
                sh 'chmod 644 ~/.ssh/known_hosts'
            }
        }
        stage('Checkout') {
            steps {
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
                sh 'npm install' // Install 
            }
        }
        stage('Build') {
            steps {
                sh """
                export VITE_API_USER='REDACTED' 
                export VITE_API_PW='REDACTED' 
                npm run build
                """ 
            }
        }
        stage('Deploy') {
            when {
                branch 'master' 
            }
            steps {
                    sshagent(credentials: ['SSH-agent-to-ubuntu']) {
                    echo 'Initiating deploy'
                    sh """
                    ### We cannot SCP directly into a docker container, thus we must make these intermediary steps:
                    # 1. Create a temporary directory on the host
                    ssh andtif@192.168.68.134 'mkdir -p /tmp/deploy'
                    
                    # 2. Secure copy the built files to the temporary directory
                    scp -r dist/* andtif@192.168.68.134:/tmp/deploy
                    
                    # 3. Use docker cp to move the files from the host to the Docker container
                    ssh andtif@192.168.68.134 '
                        docker cp /tmp/deploy/. nginx-nginx-1:/usr/share/nginx/html
                        docker exec nginx-nginx-1 nginx -s reload
                        rm -rf /tmp/deploy  # Clean up the temporary directory
                    '
                    """
                    echo 'Deploy done'
                    }
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
