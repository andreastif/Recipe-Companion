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
        stage('Checkout') {
            steps {
                checkout scm // Checks out source code to workspace
            }
        }
        stage('Test') {
            steps {
                //no tests yet
                echo 'No tests yet, skipping to Build.'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build' // Build 
            }
        }
//         stage('Create Docker Image') {
//             when {
//                 branch 'master' 
//             }
//             steps {
//                 script {
//                     // Assumes that the JAR file is built with 'gradlew build'
//                     def app = docker.build("${REGISTRY_URL}/${IMAGE}:${TAG}")
//                 }
//             }
//         }
//         stage('Push Image') {
//             when {
//                 branch 'master'
//             }
//             steps {
//                 script {
//                     docker.withRegistry("https://${REGISTRY_URL}", REGISTRY_CREDENTIALS_ID) {
//                         docker.image("${REGISTRY_URL}/${IMAGE}:${TAG}").push()
//                     }
//                 }
//             }
//         }
//         stage('Deploy') {
//             when {
//                 branch 'master' 
//             }
//             steps {
//                 withCredentials([usernamePassword(credentialsId: 'andtif-registry-credentials', usernameVariable: 'REGISTRY_USER', passwordVariable: 'REGISTRY_PASS')]) {
//                     sshagent(credentials: ['SSH-agent-to-ubuntu']) {
//                         sh """
//                             ssh -o StrictHostKeyChecking=no andtif@192.168.68.134 '
//                                 echo "Logging into Docker registry..."
//                                 echo \$REGISTRY_PASS | docker login ${REGISTRY_URL} -u "\$REGISTRY_USER" --password-stdin
            
//                                 echo "Pulling the latest image..."
//                                 docker pull ${REGISTRY_URL}/${IMAGE}:${TAG}
            
//                                 echo "Stopping existing container if it exists..."
//                                 docker stop rc-api || true
//                                 docker rm rc-api || true
            
//                                 echo "Running new container..."
//                                 docker run -d --name rc-api \\
//                                 --network recipe-companion-network \\
//                                 -e OPEN_AI_API_KEY="${OPEN_AI_API_KEY}" \\
//                                 -e API_USER="${API_USER}" \\
//                                 -e API_PW="${API_PW}" \\
//                                 -e TOKEN_ISSUER_URI="${TOKEN_ISSUER_URI}" \\
//                                 -e TOKEN_AUDIENCE="${TOKEN_AUDIENCE}" \\
//                                 -p 9000:9000 \\
//                                 ${REGISTRY_URL}/${IMAGE}:${TAG}
//                             '
//                         """
//                     }
//                 }
//             }
//         }
//     }
//     post {
//             always {
//                // TODO: SCP SAVE LOGS TO HOST HERE
//             }
//             failure {
//                 echo 'The build failed.'
//             }
//             success {
//                 echo 'Build and deployment were successful.'
                
//             }
//             // Do we need to add 'unstable', 'aborted' conditions ?
//         }
 }
